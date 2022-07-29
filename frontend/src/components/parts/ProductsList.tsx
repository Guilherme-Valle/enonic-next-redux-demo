import React from 'react'
import { APP_NAME_UNDERSCORED, getUrl } from '../../_enonicAdapter/utils'
import { PartProps } from '../../_enonicAdapter/views/BasePart';
import { Context } from '../../pages/[[...contentPath]]';
import { VariablesGetterResult } from '../../_enonicAdapter/ComponentRegistry';
import styles from '../../styles/ProductsList.module.css'
import ProductsListItem from '../views/ProductsListItem';

export const getProductsList = `
   query(){ 
    guillotine {
        query(query: "valid='true' and type='${APP_NAME_UNDERSCORED}:product'", sort: "displayName") {
            id: _id
            displayName
                ... on ${APP_NAME_UNDERSCORED}_Product {
                    data {
                        name,
                        description,
                        price,
                        photos {
                        ... on media_Image {
                            imageUrl: imageUrl(type: absolute, scale: "width(500)")
                            attachments {
                            name
                            }
                        }
                    }
                }
            }
        }
    }
}`

export interface ProductType {
    name: string,
    description: string,
    price: number,
    photos: Array<any>
}

const ProductsList = (props: PartProps) => {
    const { data } = props;
    console.log(data.query);
    return (
        <div className={styles.ProductsList}>
            {data.query.map((product: any) => {
                return <ProductsListItem {...product.data} />
            })}
        </div>
    )
}

export default ProductsList;