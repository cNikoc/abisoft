import {Api} from '../Axios.config'

export class UserService {
  private http = Api.Http
  public async userGet() {
    return await this.http.get('/registro')
      .then(res => res.data)
      .catch(e => console.error(e))
    .finally(()=> console.log('ok pet get'))
  }
  public async userPost(newRegister: any) {
    return await this.http.post('/registro', newRegister)
      .then(res => res.data)
      .catch(e => console.error(e))
    .finally(()=> console.log('ok pet post'))
  }
  public async userPatch(UpdateUser: any) {
    return await this.http.put('/registro/' + UpdateUser._id, UpdateUser)
      .then(res => res.data)
      .catch(e => console.error(e))
    .finally(()=> console.log('ok pet put'))
  }
  public async userDelete(deletUser: any) {
    return await this.http.delete('/registro/' + deletUser._id)
      .then(res => res.data)
      .catch(e => console.error(e))
    .finally(()=> console.log('ok pet del'))
  }
}
export const userService = new UserService()