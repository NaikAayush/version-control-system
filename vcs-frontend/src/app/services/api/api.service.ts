import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/models/repository/repository.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  async checkRepoName(uname: String, rname: String) {
    return await this.http
      .get<Message>(environment.apiUrl + 'checkRepoName/' + uname + '/' + rname)
      .toPromise();
  }

  async createRepo(repo: Repository) {
    return await this.http
      .post<Message>(environment.apiUrl + 'createRepo', repo)
      .toPromise();
  }

  async listRepo(uname: { uname: String }) {
    return await this.http
      .post<Message>(environment.apiUrl + 'listRepo', uname)
      .toPromise();
  }

  async getRepoDetails(uname: String, rname: String) {
    return await this.http
      .get<Message>(
        environment.apiUrl + 'getRepoDetails/' + uname + '/' + rname
      )
      .toPromise();
  }

  async updateCommit(uname: String, rname: String) {
    return await this.http
      .put<Message>(
        environment.apiUrl + 'updateCommitNo/' + uname + '/' + rname,
        ''
      )
      .toPromise();
  }

  async updateFiles(uname: String, rname: String, files: Array<String>) {
    return await this.http
      .post<Message>(environment.apiUrl + 'updateFiles', {
        uname: uname,
        rname: rname,
        fileList: files,
      })
      .toPromise();
  }

  async getFileList(uname: String, rname: String) {
    return await this.http
      .get<Message>(environment.apiUrl + 'repoFiles/' + uname + '/' + rname)
      .toPromise();
  }

  async getHistory(uname: String, rname: String) {
    return await this.http
      .get<Message>(environment.apiUrl + 'repoHistory/' + uname + '/' + rname)
      .toPromise();
  }
}
