import React, { useEffect } from "react";
import "./Albums.sass";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import User from "../../components/User/User";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../store/dataRetrieval/dataRetrieval";
import { noAvatarSrc } from "../../utils/helpers";
import Preloader from "../../components/Preloader/Preloader";

const Albums: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<{ id_user: string }>();
  const data = useSelector((state: any) => state.dataRetrieval);

  useEffect(() => {
    dispatch(getAlbums(params.id_user));
  }, [dispatch, params]);

  if (data?.data.length && data?.user) {
    const { data: albums, user } = data;

    return (
      <>
        <div className="user-profile">
          <User image={noAvatarSrc}>{user.username}</User>
        </div>
        <div className="albums_container">
          <div className="albums_container_title">Albums</div>
          <div className="albums">
            {albums.map((value: any) => (
              <NavLink
                key={value.id}
                className="albums_item"
                to={`/users/${user.id}/albums/${value.id}/photos`}
                title={value.title}
              >
                <div className="albums_item_image">
                  <img loading="lazy" src={value.image} alt={value.title} />
                  <div className="albums_item-shadow" />
                </div>
                <div className="albums_item_info">
                  <span>count: {value.count}</span>
                </div>
                <div className="albums_item_title">{value.title}</div>
              </NavLink>
            ))}
          </div>
        </div>
      </>
    );
  }

  return <Preloader />;
};

export default Albums;
