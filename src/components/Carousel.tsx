import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';

interface SlideImages {
    slide1: string;
    slide2: string;
    slide3: string;
}

export const CarouselSlider = () => {

    const classes = useStyles();
    const [sliderImages, setsliderImages] = useState<SlideImages>();
    const [file, setfile] = useState<any>(null);
    const [file2, setfile2] = useState<any>(null);
    const [file3, setfile3] = useState<any>(null);

    useEffect(() => {
        const getImagesOfSlider = async () => {
            await db.collection('carousel').doc('slides').get()
                .then(docRef => {
                    if (docRef.exists) {
                        //console.log(docRef.data())
                        setsliderImages(docRef.data() as SlideImages);
                    }
                })
        }

        getImagesOfSlider();
    }, [])

    const uploadSlideImage = async (urlImage: string) => {
        await db.collection('carousel').doc('slides').get()
            .then(docRef => {
                if (docRef.exists) {
                    docRef.ref.update({
                        slide2: urlImage
                    })
                }
            })
    }

    const handleSubmit = async () => {

        const data = new FormData();
        data.append('upload_preset', 'upload_food');
        data.append('file', file[0]);

        const data2 = new FormData();
        data.append('upload_preset', 'upload_food');
        data.append('file', file2[0]);

        const data3 = new FormData();
        data.append('upload_preset', 'upload_food');
        data.append('file', file3[0]);

        try {
            const result = await axios({
                method: 'POST',
                url: 'https://api.cloudinary.com/v1_1/dyhww1ai4/image/upload',
                data
            })            

            uploadSlideImage(result.data.secure_url)

            /* const result3 = await axios({
                method: 'POST',
                url: 'https://api.cloudinary.com/v1_1/dyhww1ai4/image/upload',
                data3
            }) */
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>IMÁGENES DEL CAROUSEL</h1>

            <div id="carouselExampleCaptions" style={{ width: 950, }} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={sliderImages?.slide1} className="d-block w-100" style={{ height: 450 }} alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={sliderImages?.slide2} className="d-block w-100" style={{ height: 450 }} alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={sliderImages?.slide3} className="d-block w-100" style={{ height: 450 }} alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>

                <form noValidate>
                    <input
                        accept='image/*'
                        className={classes.input}
                        id='contained-button-file'
                        name='productImage'
                        type='file'
                        onChange={(e) => setfile(e.currentTarget.files)}
                    />

                    <input
                        accept='image/*'
                        className={classes.input}
                        id='contained-button-file2'
                        name='productImage2'
                        type='file'
                        onChange={(e) => setfile2(e.currentTarget.files)}
                    />

                    <input
                        accept='image/*'
                        className={classes.input}
                        id='contained-button-file3'
                        name='productImage3'
                        type='file'
                        onChange={(e) => setfile3(e.currentTarget.files)}
                    />
                </form>
            </div>

            <div className={classes.root}>
                <label htmlFor='contained-button-file'>
                    <Button variant='contained' component='span' style={{ marginLeft: 15 }}>
                        Seleccionar Slide 1
                        <PhotoCamera style={{ marginLeft: 10 }} />
                    </Button>

                    <Button variant='contained' component='span' style={{ marginLeft: 15 }}>
                        Seleccionar Slide 2
                        <PhotoCamera style={{ marginLeft: 10 }} />
                    </Button>


                    <Button variant='contained' component='span' style={{ marginLeft: 15 }}>
                        Seleccionar Slide 3
                        <PhotoCamera style={{ marginLeft: 10 }} />
                    </Button>
                </label>
            </div>

            <Button onClick={handleSubmit} color='primary' variant='contained'>
                Guardar slide
            </Button>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
            marginTop: 10,
        },
        input: {
            display: 'none',
        },
    }),
);