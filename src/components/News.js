// https://newsapi.org/v2/top-headlines?country=${this.props.country}in&category=${this.props.category}&apiKey=1b73b590de5c4dc39cfb87dbb5e4d264&page=${this.state.page +1}&pageSize=${this.props.pagesize}
// https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b73b590de5c4dc39cfb87dbb5e4d264&page=1&pageSize=${this.props.pagesize}
// https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b73b590de5c4dc39cfb87dbb5e4d264&page=${this.state.page +1}&pageSize=${this.props.pagesize}

import React, { useState, useEffect } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
 const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1b73b590de5c4dc39cfb87dbb5e4d264&page=${page}&pageSize=${props.pagesize}`;

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetch(apiUrl);
      const parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    setPage(page + 1);
    try {
      setLoading(true);
      const data = await fetch(apiUrl);
      const parsedData = await data.json();
      setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching more data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.country, props.category, props.pagesize]); // dependencies that trigger the effect when changed

  return (
    <>
      <h1 className='text-center' style={{ margin: '30px 0', marginTop: '90px' }}>
        <span style={{ color: 'red', fontWeight: 500 }}>Hot</span> News - Top {props.headlines} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className='row mt-3 my-2'>
            {articles.map((article) => (
              <div className='col-md-3 my-3' key={article.url}>
                <NewsItems
                  title={article.title ? article.title.slice(0, 45) : ''}
                  description={article.description ? article.description.slice(0, 88) : ''}
                  imageUrl={article.urlToImage}
                  url={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  source={article.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
  headlines: PropTypes.string,
};

News.defaultProps = {
  country: 'in',
  pagesize: 24,
  category: 'general',
  headlines: '',
};

export default News;
