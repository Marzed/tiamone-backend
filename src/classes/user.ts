class User {
  id: number;
  role: number;
  email: string;
  password: string;

  constructor(id: number, role: number) {
    this.id = id;
    this.role = role;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  saveToDB(): boolean {
    console.log('Сохранить в БД:');
    return true;
  }
}
