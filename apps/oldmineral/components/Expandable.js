import React from 'react';
class Expandable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: true };

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { title, children } = this.props;
    const collapsedClass = this.state.collapsed ? 'collapsed' : 'uncollapsed';
    const arrow = this.state.collapsed ? 'expand' : 'collapse';

    return (
      <div className="expandable">
        <style jsx>{`
          .expandable {
            position: relative;
            border-bottom: 1px solid lightgrey;
            font-size: 21px;
            margin-top: 10px;
          }

          .unhidden:hover {
            background-color: #ddd;
          }

          .unhidden {
            cursor: pointer;
            overflow: hidden;
            background-color: aliceblue;
            padding: 10px;
            transition: all 0.26s ease;
          }

          .collapsible {
            overflow: auto;
            height: 200px;
            opacity: 1;
            transition: all 0.26s ease;
            background: #eee;
          }

          .collapsible.collapsed {
            height: 0;
            opacity: 0;
          }

          .uncollapsed {
            padding: 10px;
          }

          .arrow {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 10px;
            color: #ddd;
          }
        `}</style>
        <div className="unhidden" onClick={this.onToggle}>
          <strong>{title}</strong>
        </div>
        <div>
          <div className={`collapsible ${collapsedClass}`}>{children}</div>
        </div>
        <div className="arrow">{arrow}</div>
      </div>
    );
  }
}

export default Expandable;
