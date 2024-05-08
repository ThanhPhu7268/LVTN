import { Button } from '@material-tailwind/react'
import React from 'react'

export default function Gallery() {
    return (
        <div className='flex' style={{ justifyContent: 'space-evenly', marginBottom: '40px' }}>
            <img style={{ width: '340px', height: '512px', marginLeft: '60px', marginTop: '80px' }} src='https://images.pexels.com/photos/1374128/pexels-photo-1374128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
            <div style={{ marginTop: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* <img style={{ width: '340px', height: '256px', marginTop: '120px', marginLeft: '60px' }} src='https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' /> */}
                <p style={{ fontSize: '50px', color: 'black', fontFamily: 'fangsong' }}>New Collection</p>
                {/* <Button style={{ display: 'flex', alignItems: 'center', borderRadius: '0', justifyContent: 'center', width: '68%' }}>
                    Explore More
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M17.079 12.5H5v-1h12.079l-5.792-5.792L12 5l7 7l-7 7l-.713-.708z" /></svg>
                </Button> */}
            </div>
            <img style={{ width: '340px', height: '512px', marginLeft: '60px', marginTop: '30px' }} src='https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
        </div>
    )
}
