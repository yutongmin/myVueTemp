export const delay = (interval: any) => (promise: Promise<any>) =>
  new Promise((resolve, reject) => {
    promise
      .then((result) => {
        setTimeout(() => resolve(result), interval);
      })
      .catch((error) => {
        setTimeout(() => reject(error), interval);
      });
  });

export const timeout = (interval: number, message: string) => (promise: Promise<any>) =>
  Promise.race([
    delay(interval)(Promise.reject(new Error(message))),
    promise,
  ]);
