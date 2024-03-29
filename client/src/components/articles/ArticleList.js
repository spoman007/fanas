import React from 'react';
import Article from './Article';
import Spinner from '../Spinner';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';

const ArticleList = ({ isOpen, language, handleDrag }) => {
  const fetchArticles = () =>
    fetch(`https://vercel-api-silk.vercel.app/api/articles/${language}`).then((res) => res.json());

  const { status, data: articles, error } = useQuery(`articles${language}`, fetchArticles);

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <motion.div
      // drag="x"
      // dragConstraints={{ left: 0, right: 0 }}
      // onDragEnd={(_event, info) => handleDrag(info.point.x)}
      className="container"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.2 }}
      style={{ backgroundColor: isOpen ? '#848484' : null }}
    >
      {articles.map((article) => (
        <Article article={article} key={article.title} />
      ))}
    </motion.div>
  );
};

export default ArticleList;
