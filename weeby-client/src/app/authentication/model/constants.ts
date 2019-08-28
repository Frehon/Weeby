export class Constants {
  public static passwordRegexp: string = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
  public static emailRegexp: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
