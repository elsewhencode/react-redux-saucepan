// @flow

import axios from 'axios';
import { type RepoType } from '../shared/reducers/reposList';

export async function fetchReposList(org: string = 'facebook'): Promise<RepoType[]> {
  try {
    const { data }: { data: RepoType[] } = await axios.get(`https://api.github.com/orgs/${org}/repos`);
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

// TODO: this bit is not needed yet
export async function fetchRepoDetails(org: string, name: string): Promise<{}> {
  try {
    const { data }: { data: {} } = await axios.get(`https://api.github.com/repos/${org}/${name}`);
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
