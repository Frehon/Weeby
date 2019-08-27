export class User {

  private _name: string;
  private _email: string;
  private _password: string;

  get name(): string {
    return this._name;
  }

  set name(value: string): void {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string): void {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string): void {
    this._password = value;
  }
}
