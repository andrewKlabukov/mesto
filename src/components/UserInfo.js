export class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this.name = document.querySelector(nameSelector);
    this.job = document.querySelector(jobSelector);
    this.avatar = document.querySelector(avatarSelector);
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
    this.avatar.src = user.avatar;    
  }
// получение нашего id
  getUserId() {    
    return this.userId
  }

}