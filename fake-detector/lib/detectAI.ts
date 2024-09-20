import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'
import sharp from 'sharp'

let model: mobilenet.MobileNet | null = null

export async function loadModel() {
  if (!model) {
    await tf.ready()
    model = await mobilenet.load()
  }
  return model
}

export async function detectAI(buffer: Buffer): Promise<{ isAI: boolean; confidence: number }> {
  const model = await loadModel()
  
  // Procesar la imagen con sharp
  const { data, info } = await sharp(buffer)
    .resize(224, 224)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  // Convertir los datos de la imagen a un tensor
  const imageTensor = tf.tensor3d(new Uint8Array(data), [224, 224, 3])
  
  // Normalizar los valores de los píxeles
  const normalizedImage = imageTensor.toFloat().div(tf.scalar(255)).expandDims(0)
  
  // Realizar la clasificación
  const predictions = await model.classify(normalizedImage)
  
  // Limpiar los tensores para evitar fugas de memoria
  imageTensor.dispose()
  normalizedImage.dispose()
  
  // Procesar los resultados
  const topPrediction = predictions[0]
  const isAI = topPrediction.probability > 0.9 // Umbral arbitrario
  const confidence = topPrediction.probability
  
  return { isAI, confidence }
}