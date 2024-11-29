import {useInfiniteQuery} from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchProducts } from '../hooks/queries';
import { Button, Container, Spinner } from 'react-bootstrap';
import React from 'react';
import ProductCard from './ProductCard';

function Catalog() {
    const {data, isLoading, isError, isSuccess, isFetching, fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return nextPage <= 5 ? nextPage : undefined;
        }
    })

    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        setAllProducts(fetchProducts());
        if(data){
            setAllProducts(data.pages)
        }
    }, [data])

    if (isLoading) return <Spinner animation='border' role='status'><span className='visually-hidden'>Loading...</span></Spinner>
    if (isError) return <Alert variant='danger'>Error fetching data</Alert>

    return (
        <Container className='mx-auto'>
            {/* {showDeleteSuccessAlert && <Alert variant="success">Post deleted!</Alert>} */}
            <div className='d-flex flex-wrap mx-auto justify-content-center'>
                {isSuccess && allProducts.length > 0 && allProducts.map((page, index) => (
                    <React.Fragment key={index}>
                        {page.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
            {hasNextPage && (
                <div className='d-flex justify-content-center'>
                    <Button variant='primary' disabled={isFetching} onClick={() => fetchNextPage()}>
                        {isFetching ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            )}
        </Container>
    );
}

export default Catalog;