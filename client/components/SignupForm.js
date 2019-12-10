import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] };
    }

    componentWillUpdate(nextProps) {
        // this.props // the old, current set of props
        // nextProps // the next set of props that will be in place
        // when the component rerenders
        if (!this.props.data.user && nextProps.data.user) {
            // redirect to dashboard!!!!
            hashHistory.push('/dashboard');
          }
        }

    onSubmit({email, password}) {
        this.props.mutate({
            variables: {email, password},
            refetchQueries: [{query}]
        }).catch(res => {
            const errors = res.graphQLErrors.map( err => err.message);
            this.setState({errors});
        });
    }

    render() {
        return (
            <div>
                <h3>Signup</h3>
                <AuthForm 
                    onSubmit={this.onSubmit.bind(this)}
                    errors={this.state.errors}    
                />
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(SignupForm)
);