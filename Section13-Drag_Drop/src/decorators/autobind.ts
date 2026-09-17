namespace App {
  // autobind decorator
  // property descriptor => because methods in the end, are just properties, properties which hold functions
  // Now, why is this a method decorator? Because the idea is that we can add it to submitHandler
  export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
      configurable: true,
      // getter, which will be executed when you try to access the function
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjustedDescriptor;
  }
}
