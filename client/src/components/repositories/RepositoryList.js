import React from 'react';
import Repository from './Repository';
import Spinner from '../Spinner';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { useLocalStorage } from '../../hooks/Hooks';

const RepositoryList = ({ isOpen, language, handleDrag }) => {
  const [favoriteRepos, setFavorite] = useLocalStorage('favorites', []);
  const bookmark = (title) => {
    const newFavorites =
      favoriteRepos.find((obj) => obj.title === title) === undefined
        ? [...favoriteRepos, repos.find((obj) => obj.title === title)]
        : favoriteRepos.filter((obj) => obj.title !== title);
    setFavorite(newFavorites);
  };
  const fetchRepos = () =>
    fetch(`https://vercel-api-spoman007.vercel.app/api/repositories/${language}`).then((res) =>
      res.json()
    );

  const { status, data: repos, error } = useQuery(`repository${language}`, fetchRepos);
  const currentRepos = repos ? repos : [];
  const allRepos = [
    ...currentRepos,
    ...favoriteRepos.filter((obj) => !currentRepos.filter((x) => x.title === obj.title).length > 0),
  ];

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <motion.div
      // drag
      // dragConstraints={{ left: 0, right: 0 }}
      // onDragEnd={
      //   (_event, info) => handleDrag(info.point.x)
      // }
      className="container"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.2 }}
      style={{ backgroundColor: isOpen ? '#848484' : null }}
    >
      {allRepos.map((repo) => {
        repo = {
          ...repo,
          isFavorite: favoriteRepos.filter((obj) => obj.title === repo.title).length > 0,
        };
        return <Repository repo={repo} key={repo.title} bookmark={bookmark} />;
      })}
    </motion.div>
  );
};

export default RepositoryList;
