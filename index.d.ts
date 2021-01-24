type TProductId = number

type TProductAttributes = []



type TProduct = {
    id: TProductId
    img: string
    alt: string
    title: string
    description: string
    localidad: string
    duracion:string
    info: string
    condiciones: TProductAttributes
}