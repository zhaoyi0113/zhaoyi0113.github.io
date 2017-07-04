import React from 'react';

const Article = ({ article }) => (
  <div
    className="article"
    style={styles.article}
    onClick={() => window.location.assign(article.link)}
  >
    <div className="title" style={styles.article.title}>{article.title}</div>
    <div style={styles.article.desc}>{article.description}</div>
  </div>
);

const RecentArticles = ({ recentArticles }) => (
  <div style={styles.root} className="recent-articles">
    <div style={styles.header} className="header">
      <div className="text" style={styles.header.text}>RECENT ARTICLES</div>
    </div>
    <div style={styles.articles}>
      {recentArticles.map(article => (
        <Article id={article.id} article={article} />
      ))}
    </div>
  </div>
);

export default RecentArticles;

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: 'url(../assets/img/bg-footer-stripedc.png) center top repeat-x',
    backgroundColor: 'rgb(237,233,218)',
  },
  header: {
    marginBottom: 30,
    text: {
      color: 'rgb(122,95,96)',
      paddingTop: '100px',
      textAlign: 'center',
      fontSize: '20px'
    }
  },
  articles: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  article: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 30,
    flex: 1,
    title: {
      color: 'rgb(16,165,135)',
      textAlign: 'center',
      margin: 10,
    },
    desc: {
      color: 'rgb(122,95,96)',
      textAlign: 'left'
    }
  }
};
