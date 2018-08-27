import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


class Liste extends React.Component {
    render() {
        return(
            <Typography variant="body1">
                <Link to="/Anleitungen/S3_Physik/Anleitung_1">Anleitung 1</Link>
            </Typography>
        )
    }
}

export default Liste;