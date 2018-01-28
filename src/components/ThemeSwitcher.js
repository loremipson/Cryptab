import React, { Component } from 'react';
import './ThemeSwitcher.css';

export default class ThemeSwitcher extends Component {
  toggleTheme() {
    this.props.toggleTheme();
    const bool = JSON.parse(localStorage.getItem('lightTheme'));
    localStorage.setItem('lightTheme', !bool);
  }
  render() {
    return <input type="checkbox" onChange={this.toggleTheme.bind(this)} className="switch" id="switch-1" />;
  }
}
