declare module '@tensorflow-models/mobilenet' {
    export function load(): Promise<MobileNet>;
    export interface MobileNet {
      classify(input: tf.Tensor | tf.Tensor[]): Promise<Array<{ className: string; probability: number }>>;
    }
  }
  