import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

export default function HomePage() {
  const [petsData, setPetsData] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPages, setMaxPages] = useState("");
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(5);

  const [activeModal, setActiveModal] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState({});

  useEffect(() => {
    fetchAnimals("");
    setCurrentPage(1);
  }, []);

  // GET https://api.thedogapi.com/v1/breeds/search?q={termo}

  async function fetchAnimals(term) {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${term ? `search?q=${term}` : ""}`
    );
    // setPetsData(response.data);
    generatePagination(response.data);
  }

  function handleClickRow(data) {
    console.log(data);
    setSelectedBreed(data);
    setActiveModal(true);
  }

  async function handleSearch(e) {
    setCurrentPage(1);
    setSearch(e.target.value);
    fetchAnimals(e.target.value);
  }

  function filterByCurrentPage(element) {
    return element.page === currentPage;
  }

  async function generatePagination(petList) {
    const paginatedElements = [];

    const pagesLength = Math.ceil(petList.length / 10);

    setMaxPages(pagesLength);

    for (let i = 1; i <= pagesLength; i++) {
      const firsElement = (i - 1) * 10;
      const lastElement = firsElement + 10;
      const elementsInPage = petList.slice(firsElement, lastElement);

      elementsInPage.forEach((element) => {
        paginatedElements.push({
          page: i,
          data: element,
        });
      });
    }

    setPetsData(paginatedElements);

    const pages = [];
    for (let i = 1; i <= pagesLength; i++) {
      pages.push({
        index: i,
        content: (
          <div onClick={(e) => setCurrentPage(i)} key={i} className="page-item">
            {i}
          </div>
        ),
      });
    }

    setPages(pages);
  }

  return (
    <>
      <div className="page" id="home">
        <Modal breed={selectedBreed} isActive={activeModal} setActiveModal={setActiveModal} />
        <h3>Lista de raças</h3>
        <div className="table-container">
          <div className="table-container__header">
            <div className="table-container__search-input input-group">
              <input placeholder="Pesquisar" value={search} onChange={handleSearch} />
            </div>
            <table>
              <tr>
                <th>Nome</th>
                <th>Raça</th>
                <th>Origem</th>
                <th>Duração de vida</th>
              </tr>
              {petsData.length > 0 &&
                petsData.filter(filterByCurrentPage).map((element) => (
                  <tr key={element.data.id} onClick={() => handleClickRow(element.data)}>
                    <td>{element.data.name}</td>
                    <td>{element.data.breed_group || "Não identificado"}</td>
                    <td>{element.data.origin || "Não identificado"}</td>
                    <td>{element.data.life_span}</td>
                  </tr>
                ))}
            </table>
            {petsData.length <= 0 && (
              <span className="no-results">Nenhum resultado encontrado</span>
            )}
          </div>

          {pages && petsData.length > 0 && (
            <ul className="pagination">
              {pages.map((item) => (
                <li className={currentPage == item.index ? "active" : "inactive"}>
                  {item.content}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
