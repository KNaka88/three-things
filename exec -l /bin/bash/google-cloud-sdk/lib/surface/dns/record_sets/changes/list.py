# Copyright 2014 Google Inc. All Rights Reserved.
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

"""gcloud dns record-sets changes list command."""

from apitools.base.py import list_pager
from googlecloudsdk.api_lib.util import apis
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.dns import flags
from googlecloudsdk.core import properties


class List(base.ListCommand):
  """View the list of changes that have been made to your record-sets.

  This command displays the list of changes that have been made to your
  record-sets.

  ## EXAMPLES

  To see the list of changes, run:

    $ {command}

  To see the list of first 10 changes, run:

    $ {command} --limit=10
  """

  @staticmethod
  def Args(parser):
    flags.GetZoneArg().AddToParser(parser)
    parser.add_argument(
        '--sort-order', default=None, required=False,
        choices=['ascending', 'descending'],
        help='Sort order for listing.')
    parser.display_info.AddFormat(flags.CHANGES_FORMAT)

  def Run(self, args):
    dns_client = apis.GetClientInstance('dns', 'v1')
    dns_messages = apis.GetMessagesModule('dns', 'v1')

    project_id = properties.VALUES.core.project.Get(required=True)

    return list_pager.YieldFromList(
        dns_client.changes,
        dns_messages.DnsChangesListRequest(
            project=project_id,
            managedZone=args.zone,
            sortOrder=args.sort_order),
        limit=args.limit, field='changes')
