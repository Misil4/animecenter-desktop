import AppContext from "@/context/context";
import { Row, Col, Typography, Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { shell } from "electron";
const { Title } = Typography;
const User: React.FC = () => {
  const { login, imagen, tema } = useContext(AppContext);
  const [animeNews, setAnimeNews] = useState<any[]>([]);
  const [nextAnimes, setNextAnimes] = useState<any[]>([]);
  useQuery({
    queryKey: ["lastAnime"],
    queryFn: async () => {
      return axios
        .get(`${import.meta.env.VITE_API_URL}/lastAnimeNews`,{headers : {"Authorization" : "pc"}})
        .then(({ data }) => setAnimeNews(data));
    },
  });
  useQuery({
    queryKey: ["nextAnime"],
    queryFn: async () => {
      return axios
        .get(`${import.meta.env.VITE_API_URL}/lastAnimeSeries`)
        .then(({ data }) => setNextAnimes(data));
    },
  });
  return (
    <Row style={{ padding: "2%", height: "100%", overflowY: "auto" }}>
      <Col>
        <Title style={{ color: tema === "light" ? "black" : "white" }}>
          Bienvenido de nuevo {login}
        </Title>
        {imagen === "" || null ? (
          <Avatar shape="square" size={100} icon={<UserOutlined />} />
        ) : (
          <Image
            preview={false}
            width={200}
            style={{ objectFit: "contain" }}
            height={200}
            src={Buffer.from(imagen, "base64").toString()}
          />
        )}
        <Title style={{ textAlign: "center" }}>ULTIMAS NOTICIAS</Title>
        <Row>
          {animeNews.map((item,index) => {
            return (
              <Col key={index}
                span={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "2%",
                }}
              >
                <h3>{item.title}</h3>
                <Image
                  preview={false}
                  onClick={() => shell.openExternal(item.url)}
                  src={item.image}
                  width={"100%"}
                  height={"100%"}
                />
              </Col>
            );
          })}
        </Row>
        <Title style={{ textAlign: "center" }}>PROXIMAMENTE</Title>
      </Col>
    </Row>
  );
};

export default User;
