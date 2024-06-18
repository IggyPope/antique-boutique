import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Box,
  Stack,
} from '@mui/material';

import JuliaImg from '@/assets/img/Julia.png';
import AnastasiaImg from '@/assets/img/Nastia.png';

const teamMembers = [
  {
    name: 'Julia',
    description:
      'Julia is a translator with a passion for all kinds of languages, including JavaScript. In the project, she was in charge of the front-end part and made the forms and the carousels.',
    imageUrl: JuliaImg,
    githubUrl: 'https://github.com/JuliaBel5',
  },
  {
    name: 'Igor',
    description:
      'Igor is our team lead and he was mostly responsible for the business logic and state management within the project. A former financial analyst, he is passionate about web development and new technologies. He brought RTK into the project.',
    imageUrl: 'https://avatars.githubusercontent.com/u/2043443?v=4',
    githubUrl: 'https://github.com/IggyPope',
  },
  {
    name: 'Anastasia',
    description:
      'Anastasia is a young student passionate about web development. In the project, she was involved in the front-end part, creating the main page, the catalog page, and the cart page layouts.',
    imageUrl: AnastasiaImg,
    githubUrl: 'https://github.com/kovalkl',
  },
];

const About = () => {
  return (
    <Container>
      <Stack gap={4}>
        <Box display="flex" flexDirection="column" alignItems="start">
          <Box display="flex" marginBottom={2} alignItems="center" justifyContent="center">
            <Avatar
              alt="CoffeeCode Mood"
              title="CoffeeCode Mood"
              src="https://cdn.rs.school/sloths/stickers/deadline/image.svg"
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Typography variant="h5" component="h2">
              Our Team
            </Typography>
          </Box>
          <div style={{ textAlign: 'justify' }}>
            <Typography variant="body2" color="text.secondary" sx={{ textIndent: '20px' }}>
              {' '}
              <strong> CoffeeCode</strong> is a dynamic trio of RS School students, each bringing
              unique backgrounds to the table but united by a shared passion for coding and a
              collective ambition to excel as front-end developers. Our diversity fuels our
              innovation, and our unity drives us to push the boundaries of what&apos;s possible in
              the world of web development.
            </Typography>
          </div>
        </Box>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}
                onClick={() => window.open(member.githubUrl, '_blank')}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={member.imageUrl}
                  alt={member.name}
                  title={member.name}
                  sx={{
                    width: 'auto',
                    height: 350,
                    maxWidth: '100%',
                    margin: '0 auto',
                    display: 'block',
                    borderRadius: '7px',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="div" mb={1}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" flexDirection="column" alignItems="start" mb={4}>
          <Box display="flex" marginBottom={2} alignItems="center" justifyContent="center">
            <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
              <Avatar
                alt="RS School Logo"
                title="RS School Logo"
                src="src/assets/img/RsLogo.png"
                sx={{ width: 56, height: 56, mr: 2 }}
              />
            </a>
            <Typography variant="h5" component="div">
              Our School
            </Typography>
          </Box>
          <Box>
            <div style={{ textAlign: 'justify' }}>
              <Typography variant="body2" color="text.secondary" sx={{ textIndent: '20px' }}>
                {' '}
                <strong> RS School </strong> stands out as a pioneering, community-driven initiative
                offering top-tier education at no cost to aspiring software developers. Comprised of
                dedicated learners and experienced mentors, RS School fosters an environment
                conducive to growth and excellence. The institution prides itself on providing
                comprehensive training in cutting-edge technologies, with a strong focus on
                JavaScript and TypeScript, setting the stage for students to master these
                foundational languages.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textIndent: '20px' }}>
                {' '}
                Our final project, an e-commerce website, is a testament to the profound learning
                experience offered by RS School. This project not only showcases the culmination of
                our studies but also highlights the practical application of the skills we&apos;ve
                honed throughout our time at RS School. From the basics of JavaScript to the
                advanced concepts of TypeScript and React, every lesson has been instrumental in
                bringing our e-commerce site to life.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textIndent: '20px' }}>
                {' '}
                By completing this project, we have demonstrated our ability to effectively utilize
                the knowledge gained from RS School to create functional, scalable web applications.
                This achievement underscores the effectiveness of RS School&apos;s curriculum in
                preparing us for real-world challenges in the software development industry.
              </Typography>
            </div>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default About;
