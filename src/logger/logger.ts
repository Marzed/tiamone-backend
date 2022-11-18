export default class Logger {
  public static info = (route: string, message: any) =>
    console.log(`[${new Date().toLocaleString()}] [INFO] [${route}] ${message}`);
  public static warning = (route: string, message: any) =>
    console.log(`[${new Date().toLocaleString()}] [WARNING] [${route}] ${message}`);
  public static error = (route: string, message: any) =>
    console.log(`[${new Date().toLocaleString()}] [ERROR] [${route}] ${message}`);
  public static critical = (route: string, message: any) =>
    console.log(`[${new Date().toLocaleString()}] [CRITICAL] [${route}] ${message}`);
}
