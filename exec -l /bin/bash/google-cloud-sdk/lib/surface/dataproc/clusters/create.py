# Copyright 2015 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Create cluster command."""

from apitools.base.py import encoding

from googlecloudsdk.api_lib.compute import utils as api_utils
from googlecloudsdk.api_lib.dataproc import compute_helpers
from googlecloudsdk.api_lib.dataproc import constants
from googlecloudsdk.api_lib.dataproc import util
from googlecloudsdk.calliope import actions
from googlecloudsdk.calliope import arg_parsers
from googlecloudsdk.calliope import base
from googlecloudsdk.calliope import exceptions
from googlecloudsdk.command_lib.compute.instances import flags as instances_flags
from googlecloudsdk.command_lib.util import labels_util
from googlecloudsdk.core import log
from googlecloudsdk.core import properties


def _CommonArgs(parser):
  """Register flags common to all tracks."""
  instances_flags.AddTagsArgs(parser)
  base.ASYNC_FLAG.AddToParser(parser)
  labels_util.AddCreateLabelsFlags(parser)
  # 30m is backend timeout + 5m for safety buffer.
  util.AddTimeoutFlag(parser, default='35m')
  parser.add_argument(
      '--metadata',
      type=arg_parsers.ArgDict(min_length=1),
      action='append',
      default=None,
      help=('Metadata to be made available to the guest operating system '
            'running on the instances'),
      metavar='KEY=VALUE')
  parser.add_argument('name', help='The name of this cluster.')
  parser.add_argument(
      '--num-workers',
      type=int,
      help='The number of worker nodes in the cluster. Defaults to '
      'server-specified.')
  parser.add_argument(
      '--num-preemptible-workers',
      type=int,
      help='The number of preemptible worker nodes in the cluster.')
  parser.add_argument(
      '--main-machine-type',
      help='The type of machine to use for the main. Defaults to '
      'server-specified.')
  parser.add_argument(
      '--worker-machine-type',
      help='The type of machine to use for workers. Defaults to '
      'server-specified.')
  parser.add_argument('--image', hidden=True)
  parser.add_argument(
      '--image-version',
      metavar='VERSION',
      help='The image version to use for the cluster. Defaults to the '
      'latest version.')
  parser.add_argument(
      '--bucket',
      help='The Google Cloud Storage bucket to use with the Google Cloud '
      'Storage connector. A bucket is auto created when this parameter is '
      'not specified.')

  netparser = parser.add_mutually_exclusive_group()
  netparser.add_argument(
      '--network',
      help="""\
      The Compute Engine network that the VM instances of the cluster will be
      part of. This is mutually exclusive with --subnet. If neither is
      specified, this defaults to the "default" network.
      """)
  netparser.add_argument(
      '--subnet',
      help="""\
      Specifies the subnet that the cluster will be part of. This is mutally
      exclusive with --network.
      """)
  parser.add_argument(
      '--zone', '-z',
      help='The compute zone (e.g. us-central1-a) for the cluster.',
      action=actions.StoreProperty(properties.VALUES.compute.zone))
  parser.add_argument(
      '--num-worker-local-ssds',
      type=int,
      help='The number of local SSDs to attach to each worker in a cluster.')
  parser.add_argument(
      '--num-main-local-ssds',
      type=int,
      help='The number of local SSDs to attach to the main in a cluster.')
  parser.add_argument(
      '--initialization-actions',
      type=arg_parsers.ArgList(min_length=1),
      metavar='CLOUD_STORAGE_URI',
      help=('A list of Google Cloud Storage URIs of '
            'executables to run on each node in the cluster.'))
  parser.add_argument(
      '--initialization-action-timeout',
      type=arg_parsers.Duration(),
      metavar='TIMEOUT',
      default='10m',
      help='The maximum duration of each initialization action.')
  parser.add_argument(
      '--properties',
      type=arg_parsers.ArgDict(),
      metavar='PREFIX:PROPERTY=VALUE',
      default={},
      help="""\
Specifies configuration properties for installed packages, such as Hadoop
and Spark.

Properties are mapped to configuration files by specifying a prefix, such as
"core:io.serializations". The following are supported prefixes and their
mappings:

[format="csv",options="header"]
|========
Prefix,Target Configuration File
core,core-site.xml
hdfs,hdfs-site.xml
mapred,mapred-site.xml
yarn,yarn-site.xml
hive,hive-site.xml
pig,pig.properties
spark,spark-defaults.conf
|========

""")
  parser.add_argument(
      '--service-account',
      help='The Google Cloud IAM service account to be authenticated as.')
  parser.add_argument(
      '--scopes',
      type=arg_parsers.ArgList(min_length=1),
      metavar='SCOPE',
      help="""\
Specifies scopes for the node instances. The project's default service account
is used. Multiple SCOPEs can specified, separated by commas.
Examples:

  $ {{command}} example-cluster --scopes https://www.googleapis.com/auth/bigtable.admin

  $ {{command}} example-cluster --scopes sqlservice,bigquery

The following scopes necessary for the cluster to function properly are always
added, even if not explicitly specified:

[format="csv"]
|========
{minimum_scopes}
|========

If this flag is not specified the following default scopes are also included:

[format="csv"]
|========
{additional_scopes}
|========

If you want to enable all scopes use the 'cloud-platform' scope.

SCOPE can be either the full URI of the scope or an alias.
Available aliases are:

[format="csv",options="header"]
|========
Alias,URI
{aliases}
|========
""".format(
    minimum_scopes='\n'.join(constants.MINIMUM_SCOPE_URIS),
    additional_scopes='\n'.join(constants.ADDITIONAL_DEFAULT_SCOPE_URIS),
    aliases=compute_helpers.SCOPE_ALIASES_FOR_HELP))

  main_boot_disk = parser.add_mutually_exclusive_group()
  worker_boot_disk = parser.add_mutually_exclusive_group()

  # Deprecated, to be removed at a future date.
  main_boot_disk.add_argument(
      '--main-boot-disk-size-gb',
      type=int,
      hidden=True)
  worker_boot_disk.add_argument(
      '--worker-boot-disk-size-gb',
      type=int,
      hidden=True)

  boot_disk_size_detailed_help = """\
      The size of the boot disk. The value must be a
      whole number followed by a size unit of ``KB'' for kilobyte, ``MB''
      for megabyte, ``GB'' for gigabyte, or ``TB'' for terabyte. For example,
      ``10GB'' will produce a 10 gigabyte disk. The minimum size a boot disk
      can have is 10 GB. Disk size must be a multiple of 1 GB.
      """
  main_boot_disk.add_argument(
      '--main-boot-disk-size',
      type=arg_parsers.BinarySize(lower_bound='10GB'),
      help=boot_disk_size_detailed_help)
  worker_boot_disk.add_argument(
      '--worker-boot-disk-size',
      type=arg_parsers.BinarySize(lower_bound='10GB'),
      help=boot_disk_size_detailed_help)

  parser.add_argument(
      '--preemptible-worker-boot-disk-size',
      type=arg_parsers.BinarySize(lower_bound='10GB'),
      help="""\
      The size of the boot disk. The value must be a
      whole number followed by a size unit of ``KB'' for kilobyte, ``MB''
      for megabyte, ``GB'' for gigabyte, or ``TB'' for terabyte. For example,
      ``10GB'' will produce a 10 gigabyte disk. The minimum size a boot disk
      can have is 10 GB. Disk size must be a multiple of 1 GB.
      """)


@base.ReleaseTracks(base.ReleaseTrack.GA)
class Create(base.CreateCommand):
  """Create a cluster."""

  detailed_help = {
      'EXAMPLES': """\
          To create a cluster, run:

            $ {command} my_cluster
      """
  }

  @staticmethod
  def Args(parser):
    _CommonArgs(parser)
    parser.add_argument('--num-mains', type=int, hidden=True)
    parser.add_argument('--single-node', action='store_true', hidden=True)
    parser.add_argument('--no-address', action='store_true', hidden=True)

  @staticmethod
  def ValidateArgs(args):
    if args.main_boot_disk_size_gb:
      log.warn('The --main-boot-disk-size-gb flag is deprecated. '
               'Use equivalent --main-boot-disk-size=%sGB flag.',
               args.main_boot_disk_size_gb)

    if args.worker_boot_disk_size_gb:
      log.warn('The --worker-boot-disk-size-gb flag is deprecated. '
               'Use equivalent --worker-boot-disk-size=%sGB flag.',
               args.worker_boot_disk_size_gb)

    if args.single_node:
      if args.num_workers:
        raise exceptions.ConflictingArgumentsException(
            '--single-node', '--num-workers')
      if args.num_preemptible_workers:
        raise exceptions.ConflictingArgumentsException(
            '--single-node', '--num-preemptible-workers')

    if constants.ALLOW_ZERO_WORKERS_PROPERTY in args.properties:
      raise exceptions.InvalidArgumentException(
          '--properties',
          'Instead of %s, use gcloud beta dataproc clusters create '
          '--single-node to deploy single node clusters' %
          constants.ALLOW_ZERO_WORKERS_PROPERTY)

  def Run(self, args):
    self.ValidateArgs(args)

    client = self.context['dataproc_client']
    messages = self.context['dataproc_messages']

    cluster_ref = util.ParseCluster(args.name, self.context)

    compute_resources = compute_helpers.GetComputeResources(
        self.ReleaseTrack(), args.name)

    main_accelerator_type = None
    worker_accelerator_type = None
    main_accelerator_count = None
    worker_accelerator_count = None
    if self.ReleaseTrack() == base.ReleaseTrack.BETA:
      if args.main_accelerator:
        main_accelerator_type = args.main_accelerator['type']
        main_accelerator_count = args.main_accelerator.get('count', 1)
      if args.worker_accelerator:
        worker_accelerator_type = args.worker_accelerator['type']
        worker_accelerator_count = args.worker_accelerator.get('count', 1)

    # Resolve GCE resources
    zone_ref = compute_resources.Create(
        'compute.zones',
        project=cluster_ref.projectId,
        zone=properties.VALUES.compute.zone.GetOrFail())
    image_ref = args.image and compute_resources.Parse(
        args.image,
        params={'project': cluster_ref.projectId},
        collection='compute.images')
    main_machine_type_ref = (
        args.main_machine_type and compute_resources.Parse(
            args.main_machine_type,
            params={
                'project': cluster_ref.projectId,
                'zone': zone_ref.Name(),
            },
            collection='compute.machineTypes'))
    worker_machine_type_ref = (
        args.worker_machine_type and compute_resources.Parse(
            args.worker_machine_type,
            params={
                'project': cluster_ref.projectId,
                'zone': zone_ref.Name(),
            },
            collection='compute.machineTypes'))
    network_ref = args.network and compute_resources.Parse(
        args.network,
        params={'project': cluster_ref.projectId},
        collection='compute.networks')
    subnetwork_ref = args.subnet and compute_resources.Parse(
        args.subnet,
        params={
            'project': cluster_ref.projectId,
            'region': properties.VALUES.compute.region.GetOrFail,
        },
        collection='compute.subnetworks')
    main_accelerator_type_ref = (
        main_accelerator_type and compute_resources.Parse(
            main_accelerator_type,
            params={
                'project': cluster_ref.projectId,
                'zone': zone_ref.Name(),
            },
            collection='compute.acceleratorTypes'))
    worker_accelerator_type_ref = (
        worker_accelerator_type and compute_resources.Parse(
            worker_accelerator_type,
            params={
                'project': cluster_ref.projectId,
                'zone': zone_ref.Name(),
            },
            collection='compute.acceleratorTypes'))

    timeout_str = str(args.initialization_action_timeout) + 's'
    init_actions = [
        messages.NodeInitializationAction(
            executableFile=exe, executionTimeout=timeout_str)
        for exe in (args.initialization_actions or [])]
    # Increase the client timeout for each initialization action.
    args.timeout += args.initialization_action_timeout * len(init_actions)

    expanded_scopes = compute_helpers.ExpandScopeAliases(args.scopes)

    software_config = messages.SoftwareConfig(
        imageVersion=args.image_version)

    main_boot_disk_size_gb = args.main_boot_disk_size_gb
    if args.main_boot_disk_size:
      main_boot_disk_size_gb = (
          api_utils.BytesToGb(args.main_boot_disk_size))

    worker_boot_disk_size_gb = args.worker_boot_disk_size_gb
    if args.worker_boot_disk_size:
      worker_boot_disk_size_gb = (
          api_utils.BytesToGb(args.worker_boot_disk_size))

    preemptible_worker_boot_disk_size_gb = (
        api_utils.BytesToGb(args.preemptible_worker_boot_disk_size))

    if args.single_node:
      args.properties[constants.ALLOW_ZERO_WORKERS_PROPERTY] = 'true'

    if args.properties:
      software_config.properties = encoding.DictToMessage(
          args.properties, messages.SoftwareConfig.PropertiesValue)

    gce_cluster_config = messages.GceClusterConfig(
        networkUri=network_ref and network_ref.SelfLink(),
        subnetworkUri=subnetwork_ref and subnetwork_ref.SelfLink(),
        internalIpOnly=args.no_address,
        serviceAccount=args.service_account,
        serviceAccountScopes=expanded_scopes,
        zoneUri=zone_ref and zone_ref.SelfLink())

    if args.tags:
      gce_cluster_config.tags = args.tags

    if args.metadata:
      flat_metadata = dict((k, v) for d in args.metadata for k, v in d.items())
      gce_cluster_config.metadata = encoding.DictToMessage(
          flat_metadata, messages.GceClusterConfig.MetadataValue)

    main_accelerators = []
    if main_accelerator_type:
      main_accelerators.append(
          messages.AcceleratorConfig(
              acceleratorTypeUri=main_accelerator_type_ref and
              main_accelerator_type_ref.SelfLink(),
              acceleratorCount=main_accelerator_count))
    worker_accelerators = []
    if worker_accelerator_type:
      worker_accelerators.append(messages.AcceleratorConfig(
          acceleratorTypeUri=worker_accelerator_type_ref and
          worker_accelerator_type_ref.SelfLink(),
          acceleratorCount=worker_accelerator_count))

    cluster_config = messages.ClusterConfig(
        configBucket=args.bucket,
        gceClusterConfig=gce_cluster_config,
        mainConfig=messages.InstanceGroupConfig(
            numInstances=args.num_mains,
            imageUri=image_ref and image_ref.SelfLink(),
            machineTypeUri=main_machine_type_ref and
            main_machine_type_ref.SelfLink(),
            accelerators=main_accelerators,
            diskConfig=messages.DiskConfig(
                bootDiskSizeGb=main_boot_disk_size_gb,
                numLocalSsds=args.num_main_local_ssds,
            ),
        ),
        workerConfig=messages.InstanceGroupConfig(
            numInstances=args.num_workers,
            imageUri=image_ref and image_ref.SelfLink(),
            machineTypeUri=worker_machine_type_ref and
            worker_machine_type_ref.SelfLink(),
            accelerators=worker_accelerators,
            diskConfig=messages.DiskConfig(
                bootDiskSizeGb=worker_boot_disk_size_gb,
                numLocalSsds=args.num_worker_local_ssds,
            ),
        ),
        initializationActions=init_actions,
        softwareConfig=software_config,
    )

    # Secondary worker group is optional. However, users may specify
    # future pVM disk size at creation time.
    if (args.num_preemptible_workers is not None or
        preemptible_worker_boot_disk_size_gb is not None):
      cluster_config.secondaryWorkerConfig = (
          messages.InstanceGroupConfig(
              numInstances=args.num_preemptible_workers,
              diskConfig=messages.DiskConfig(
                  bootDiskSizeGb=preemptible_worker_boot_disk_size_gb,
              )))

    cluster = messages.Cluster(
        config=cluster_config,
        clusterName=cluster_ref.clusterName,
        projectId=cluster_ref.projectId)

    self.ConfigureCluster(messages, args, cluster)

    operation = client.projects_regions_clusters.Create(
        messages.DataprocProjectsRegionsClustersCreateRequest(
            projectId=cluster_ref.projectId,
            region=cluster_ref.region,
            cluster=cluster))

    if args.async:
      log.status.write(
          'Creating [{0}] with operation [{1}].'.format(
              cluster_ref, operation.name))
      return

    operation = util.WaitForOperation(
        operation,
        self.context,
        message='Waiting for cluster creation operation',
        timeout_s=args.timeout)

    get_request = messages.DataprocProjectsRegionsClustersGetRequest(
        projectId=cluster_ref.projectId,
        region=cluster_ref.region,
        clusterName=cluster_ref.clusterName)
    cluster = client.projects_regions_clusters.Get(get_request)
    if cluster.status.state == (
        messages.ClusterStatus.StateValueValuesEnum.RUNNING):
      log.CreatedResource(cluster_ref)
    else:
      log.error('Create cluster failed!')
      if operation.details:
        log.error('Details:\n' + operation.details)
    return cluster

  @staticmethod
  def ConfigureCluster(messages, args, cluster):
    """Performs any additional configuration of the cluster."""
    labels = labels_util.UpdateLabels(
        None,
        messages.Cluster.LabelsValue,
        labels_util.GetUpdateLabelsDictFromArgs(args),
        None)

    cluster.labels = labels


@base.ReleaseTracks(base.ReleaseTrack.BETA)
class CreateBeta(Create):
  """Create a cluster."""

  @staticmethod
  def Args(parser):
    _CommonArgs(parser)
    parser.add_argument(
        '--num-mains',
        type=int,
        help="""\
      The number of main nodes in the cluster.

      [format="csv",options="header"]
      |========
      Number of Mains,Cluster Mode
      1,Standard
      3,High Availability
      |========
      """)

    parser.add_argument(
        '--single-node',
        action='store_true',
        help="""\
      Create a single node cluster.

      A single node cluster has all main and worker components.
      It cannot have any separate worker nodes.
      """)

    for instance_type in ('main', 'worker'):
      help_msg = """\
      Attaches accelerators (e.g. GPUs) to the {instance_type}
      instance(s).
      """.format(instance_type=instance_type)
      if instance_type == 'worker':
        help_msg += """
      Note:
      No accelerators will be attached to preemptible workers, because
      preemptible VMs do not support accelerators.
      """
      help_msg += """
      *type*::: The specific type (e.g. nvidia-tesla-k80 for nVidia Tesla
      K80) of accelerator to attach to the instances. Use 'gcloud compute
      accelerator-types list' to learn about all available accelerator
      types.

      *count*::: The number of pieces of the accelerator to attach to each
      of the instances. The default value is 1.
      """
      parser.add_argument(
          '--{0}-accelerator'.format(instance_type),
          type=arg_parsers.ArgDict(spec={
              'type': str,
              'count': int,
          }),
          metavar='type=TYPE,[count=COUNT]',
          help=help_msg)
    parser.add_argument(
        '--no-address',
        action='store_true',
        help="""\
        If provided, the instances in the cluster will not be assigned external
        IP addresses.

        Note: Dataproc VMs need access to the Dataproc API. This can be achieved
        without external IP addresses using Private Google Access
        (https://cloud.google.com/compute/docs/private-google-access).
        """)

  @staticmethod
  def ValidateArgs(args):
    if args.main_accelerator and 'type' not in args.main_accelerator:
      raise exceptions.InvalidArgumentException(
          '--main-accelerator', 'accelerator type must be specified. '
          'e.g. --main-accelerator type=nvidia-tesla-k80,count=2')
    if args.worker_accelerator and 'type' not in args.worker_accelerator:
      raise exceptions.InvalidArgumentException(
          '--worker-accelerator', 'accelerator type must be specified. '
          'e.g. --worker-accelerator type=nvidia-tesla-k80,count=2')
