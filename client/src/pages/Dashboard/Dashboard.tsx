import { Fragment, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import llamaCoool from "../../assets/img/logo.png";
import { setRating } from "../../bridges/Movies";
import Dropdown from "../../components/Dropdown/Dropdown";
import Image from "../../components/Image/Image";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import Navbar from "../../components/Navbar/Navbar";
import Rating from "../../components/Rating/Rating";
import Table from "../../components/Table/Table";
import useAuth from "../../store/authStore";
import useMovieStore from "../../store/MovieStore";
import "./Dashboard.css";

const titleColumns = [
  {
    name: "title",
    label: "Título",
  },
  {
    name: "genre",
    label: "Género",
  },
  {
    name: "rating",
    label: "Rating",
  },
];

const ModalWithInformation = ({ selectedRow, newRating, loggedIn }: any) => {
  return (
    <div>
      <p className='title'>{selectedRow.title}</p>
      <Image
        src={selectedRow.poster}
        alt={selectedRow.title}
        style={{ height: "150px" }}
      />
      <p>
        <span className='subtitle'>Género:</span> {selectedRow.genre}
      </p>
      <p>
        <span className='subtitle'>Descripción:</span> {selectedRow.description}
      </p>
      <p>
        <span className='subtitle'>Fecha de lanzamiento:</span>{" "}
        {selectedRow.releaseDate.split("T")[0]}
      </p>
      <p>
        <span className='subtitle'>Usuarios que calificaron:</span>{" "}
        {selectedRow.usersRated}
      </p>
      <div>
        <span className='subtitle'>
          Rating: <Rating value={selectedRow.rating} />
        </span>
      </div>
      {loggedIn && (
        <div>
          <span className='subtitle'>Tu calificación:</span>
          <Rating value={0} onClick={newRating} />
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const { fetchCurrentUser, user } = useAuth((state) => state);
  const movieList = useMovieStore((state) => state.movies);
  const getMovies = useMovieStore((state) => state.getMovies);
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterBy, setFilterBy] = useState("");

  const dataTable = useMemo(() => {
    const lowerCaseSearch = search.toLowerCase();
    const filteredMovies = movieList.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(lowerCaseSearch) ||
        movie.genre.toLowerCase().includes(lowerCaseSearch) ||
        movie.rating.toString().includes(search);
      const matchesGenre =
        !filterBy || filterBy === "Todos" || movie.genre === filterBy;

      return matchesSearch && matchesGenre;
    });

    return filteredMovies.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        genre: movie.genre,
        rating: movie.rating,
        description: movie.description,
        poster: movie.poster,
        releaseDate: movie.releaseDate,
        usersRated: movie.usersRated,
      };
    });
  }, [movieList, search, filterBy]);

  const setNewRating = async (rating: number) => {
    await setRating(selectedRow.id, rating);

    setSelectedRow(null);
    setShowModal(false);
    await getMovies();
  };

  const uniqueGenres = useMemo(() => {
    const genres = movieList.map((movie) => movie.genre);
    genres.unshift("Todos");
    const uniqueGenresSet = new Set(genres);

    return Array.from(uniqueGenresSet);
  }, [movieList]);

  useEffect(() => {
    if (selectedRow) {
      setShowModal(true);
    }
  }, [selectedRow]);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Fragment>
      {showModal &&
        selectedRow &&
        createPortal(
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <ModalWithInformation
              selectedRow={selectedRow}
              newRating={setNewRating}
              loggedIn={user ? true : false}
            />
          </Modal>,
          document.body
        )}
      <div className='grid-container'>
        <Navbar
          logo={llamaCoool}
          name={user ? `Bienvenido, ${user?.fullName}` : "Dashboard"}
          loggedIn={user ? true : false}
        />
        <div>
          <p className='instructions'>
            Busca una película por título, género o rating. Si deseas calificar
            una película, inicia sesión.
          </p>
          <div className='general-container'>
            <Input
              placeholder='Search'
              type='text'
              width='800px'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className='dropdown-container'>
              <div className='filter-container text'>Filtrar por:</div>
              <Dropdown
                options={uniqueGenres}
                selectedOption={filterBy}
                setSelectedOption={setFilterBy}
              />
            </div>
          </div>
          <div className='general-container'>
            <Table
              data={dataTable}
              columns={titleColumns}
              loading={false}
              setSelectedRow={setSelectedRow}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
