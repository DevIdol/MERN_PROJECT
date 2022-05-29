import React, { Fragment, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaCode } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import Button from "../../screen/Button";
import styles from "./AllProject.module.css";
import { getProjectData } from "./ProjectData";
const code = <FaCode />;
const down = <MdDownload />;
const MobileProject = () => {
  const projects = getProjectData();
  const [loadmore, setLoadmore] = useState(3);
  const webFilter = projects
    .slice(0)
    .reverse()
    .filter((project) => project.type === "web");
  const sliceWeb = webFilter.slice(0, loadmore);
  const onLoadmore = () => {
    setLoadmore((preValue) => preValue + 3);
  };
  const isLoadmore = webFilter.length > loadmore;

  return (
    <Fragment>
      <Row>
        {sliceWeb.map((project, index) => {
          return (
            <Col key={index} md={4}>
              <Card className={styles.card}>
                <Card.Img
                  className={styles.img}
                  variant="top"
                  src={project.items.img}
                />
                <Card.Body>
                  {project.items.language.map((item, index) => (
                    <Card.Subtitle key={index} className={styles.subTitle}>
                      {item}
                    </Card.Subtitle>
                  ))}
                  <Card.Subtitle
                    key={project.items.language.toString()}
                    className={styles.subTitle}
                  >
                    {project.items.language}
                  </Card.Subtitle>
                  <Card.Title className={styles.blogTitle}>
                    <h6 className={styles.title}>{project.items.title}</h6>
                    <div className={styles.bodyIcon}>
                      <a
                        href={project.items.link}
                        className={styles.code}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                      >
                        {code}
                      </a>

                      <a
                        href={project.items.download}
                        download
                        className={styles.down}
                      >
                        {down}
                      </a>
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      {isLoadmore && (
        <Button type="button" onClick={onLoadmore} className={styles.loadBtn}>
          Load More
        </Button>
      )}
    </Fragment>
  );
};

export default MobileProject;
