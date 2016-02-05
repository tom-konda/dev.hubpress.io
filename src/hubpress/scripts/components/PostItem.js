import React from 'react';
import ColorsHubPress from '../themes/colors';
import Avatar from 'material-ui/lib/avatar';
import ListItem from 'material-ui/lib/lists/list-item';
import { Link } from 'react-router';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

class PostItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._handleEditClick = this._handleEditClick.bind(this);
    this.history = this.props.history;
  }

  handleClick() {
    this.props.onClick(this.props.post);
  }

  _handleEditClick(event, item) {
    if (item.props.action == 'edit')
      this.history.pushState(null, `/posts/${item._owner._currentElement.key}`);
  }

  render() {
    let leftAvatar;
    let buttons = [];

    let style = {
      post:{
        borderLeftWidth: '5px',
        borderLeftStyle: 'solid',
        borderBottom: `1px solid ${ColorsHubPress.selectedItem}`
      },
    };

    if (this.props.selectedPost.id === this.props.post.id) {
      style.post.backgroundColor = ColorsHubPress.selectedItem;
    }

    if (!this.props.post.original) {
      style.post.borderLeftColor = ColorsHubPress.statuses.unsave;
      buttons.push(<MenuItem>Remote save</MenuItem>);
    }
    else {
      let hasChanges = this.props.post.original.content !== this.props.post.content;
      if (hasChanges) {
        style.post.borderLeftColor = ColorsHubPress.statuses.localchange;
      }
      else {
        style.post.borderLeftColor  = ColorsHubPress.statuses.ok;
      }

      if (this.props.post.published) {
        if (hasChanges) {
          buttons.push(<MenuItem>Update</MenuItem>);
        }
        buttons.push(<MenuItem>Unpublish</MenuItem>);
      }
      else {
        if (hasChanges) {
          buttons.push(<MenuItem>Remote save</MenuItem>);
        }
        buttons.push(<MenuItem>Publish</MenuItem>);
      }
    }

    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={ColorsHubPress.orange300} />
      </IconButton>
    );

    // <MenuItem primaryText="Delete"/>
    // {buttons}

    let rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this._handleEditClick}>
        <MenuItem action="edit" primaryText="Edit"/>
      </IconMenu>
    );


    let publishedAt = !!this.props.post.published && `Published at ${this.props.post.published_at}`;

    return (
      <ListItem
        style={style.post}
        key={this.props.post.id}
        post={this.props.post}
        rightIconButton={rightIconMenu}
        primaryText={<span style={{color: ColorsHubPress.orange300}} >{this.props.post.title}</span>}
        secondaryText={
          <p>
            {publishedAt}
          </p>
        }
        secondaryTextLines={2} onTouchTap={this.handleClick.bind(this)} />
    );
  }
}
//
//
// let PostItem = React.createClass({
//   mixins: [ Router.Navigation ],
//
//   handleClick: function() {
//     this.props.onClick(this.props.post);
//   },
//
//   editPost: function() {
//     this.transitionTo('/posts/'+this.props.post.id);
//   },
//
//   render: function() {
//
//   }
// });


export default PostItem;