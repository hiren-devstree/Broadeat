import React from 'react'
import { SearchBar } from 'react-native-elements';
import StyleConfig from '../../assets/styles/StyleConfig';
import { withTheme } from 'styled-components';

class SaerchHeader extends React.Component {
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search });
    };

    moveToSearchResults = () => {
        const { search } = this.state;
        const { route } = this.props;
        if (route && route.name !== "Search") {
            this.props.navigation.push('Search', { search });
        } else {
            //Search you query via redux
        }
    };

    render() {
        const { search } = this.state;
        const { theme, route } = this.props;

        return (
            <SearchBar
                containerStyle={{
                    backgroundColor: "transparent",
                    borderBottomWidth: 0,
                    borderTopWidth: 0,
                }}
                inputStyle={{ fontSize: StyleConfig.fontSizeH3 }}
                inputContainerStyle={{
                    borderRadius: 10,
                    height: StyleConfig.convertHeightPerVal(38),
                    width: StyleConfig.width * 0.4,
                    backgroundColor: theme.textHint
                }}
                textContentType={"name"}
                placeholder="Search"
                returnKeyType="search"
                onChangeText={this.updateSearch}
                onSubmitEditing={this.moveToSearchResults}
                value={search}
            />
        );
    }
}

export default withTheme(SaerchHeader)