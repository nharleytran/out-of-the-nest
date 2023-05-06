import { useEffect, useState } from 'react';
import { Card, Group, Text, Badge, Button, Pagination } from '@mantine/core';
import * as jobApi from '../api/realtime_jobpost';

function JobPost(props) {
  const {category_id} = props
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    async function fetchPosts() {
      try {
        let search;
        switch (category_id) {
          case '63fd102f40bb0716fa58eb78':
            search = 'business analyst';
            break;
          case '63fd0ff740bb0716fa58eb76':
            search = 'software engineer';
            break;
          case '63fd104240bb0716fa58eb79':
            search = 'chemical';
            break;
          case '63fd100f40bb0716fa58eb77':
            search = 'biology';
            break;
          case '63fd0fc240bb0716fa58eb75':
            search = 'laboratory';
            break;
          default:
            search = 'software engineer';
            break;
        }
        const response = await jobApi.getJobs({
          search,
          sort_by: 'date',
        });
        setPosts(response.results);
        console.log(response.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPosts();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="job-container">
      <div className = "job-list">
      {currentPosts.map((post) => (
        <Card key={post.id} className="job-card" shadow="sm" padding="lg" radius="md" withBorder>
            <Button
                variant="light"
                color="blue"
                fullWidth
                radius="md"
                onClick={() => {
                  window.location.href = post.url;
                }}
              >
                Apply Now
            </Button>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={300}>{post.role}</Text>
            <Badge color="pink" variant="light">
              Company: {post.company_name}
            </Badge>
            <Badge color="pink" variant="light" size="sm">
              Location: {post.location ? post.location : "TBD" }
            </Badge>
          </Group>
        </Card>
      ))}
      </div>
      <Pagination
        className='pagination'
        total={Math.ceil(posts.length / postsPerPage)}
        currentPage={currentPage}
        onChange={handlePageChange}
      />

    </div>
  );
}

export default JobPost;
