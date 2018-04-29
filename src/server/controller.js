// @flow

import get from '../utils/apiCall';
import { type RepoType } from '../shared/reducers/reposList';

export async function fetchReposList(org: string = 'facebook'): Promise<RepoType[]> {
  try {
    // TODO: set endpoint baseline based on config and env
    const { body }: { body: RepoType[] } = await get(`https://api.github.com/orgs/${org}/repos`);
    return body;
  } catch (err) {
    // todo: read about throw error stuff
    console.log(err);
    throw new Error(err);
  }
}

export async function fetchRepoDetails(org: string, name: string): Promise<{}> {
  try {
    // TODO: set endpoint baseline based on config and env
    const { body }: { body: {} } = await get(`https://api.github.com/repos/${org}/${name}`);
    return body;
  } catch (err) {
    // todo: read about throw error stuff
    console.log(err);
    throw new Error(err);
  }
}
