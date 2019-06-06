import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
    render() {
        return (
            <div>
                Book details here...  
            </div>
        );
    }
}


export default graphql(getBookQuery)(BookDetails);