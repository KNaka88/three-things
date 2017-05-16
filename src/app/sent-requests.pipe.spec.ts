import { SentRequestsPipe } from './sent-requests.pipe';

describe('SentRequestsPipe', () => {
  it('create an instance', () => {
    const pipe = new SentRequestsPipe();
    expect(pipe).toBeTruthy();
  });
});
