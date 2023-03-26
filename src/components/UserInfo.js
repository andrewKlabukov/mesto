export class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this.name = document.querySelector(nameSelector);
    this.job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      job: this.job.textContent,
      id: this.userId
    }
  }

  setUserInfo(user) {
    this.name.textContent = user.name;
    this.job.textContent = user.about;
    if (user._id) {
      this.userId = user._id;      
    }
    
  }
// получение нашего id
  getUserId() {    
    return this.userId
  }

}