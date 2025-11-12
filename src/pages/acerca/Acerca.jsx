// src/pages/Acerca.jsx
import React from "react";
import { NavVisitante } from "../../components/NavAdmin/NavVisitante";

export const Acerca = () => {
    return (
        <div className="container py-4">
            {/* Nav */}
            <NavVisitante />

            {/* Hero */}
            <div className="p-4 p-md-5 mb-5 mt-4 text-bg-light rounded-3">
                <h1 className="display-6">Acerca</h1>
                <p className="lead text-justify">
                    <strong>VacantesWeb </strong> es una plataforma en línea diseñada para facilitar la gestión de oportunidades laborales.
                    Permite a las empresas publicar vacantes y a los candidatos explorar y postularse a empleos de manera eficiente.
                </p>
            </div>

            {/* Secciones */}
            <div className="row g-4">
                {/* Descripción */}
                <div className="col-12 col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body d-flex">
                            <div className="me-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0z" />
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 .875-.252 1.02-.598l.088-.416c.058-.27.18-.36.432-.36h.002c.284 0 .43.12.365.405l-.291 1.374c-.1.47-.46.73-1.08.73-1.058 0-1.507-.66-1.33-1.882l.738-3.47c.194-.896-.105-1.318-.808-1.318-.545 0-.875.252-1.02.598l-.088.416c-.058.27-.18.36-.432.36h-.002c-.284 0-.43-.12-.365-.405l.291-1.374C5.89 6.48 6.26 6 7.94 6c1.057 0 1.507.66 1.33 1.882z" />
                                    <circle cx="8" cy="4.5" r="1" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="card-title">Descripción</h5>
                                <p className="card-text text-justify mb-0">
                                    VacantesApp centraliza la información de empleos disponibles, permitiendo a los usuarios navegar,
                                    filtrar y postularse a las vacantes de manera organizada y rápida.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Misión */}
                <div className="col-12 col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body d-flex">
                            <div className="me-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bullseye" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
                                    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 1A5 5 0 1 1 8 3a5 5 0 0 1 0 10z" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="card-title">Misión</h5>
                                <p className="card-text mb-0">
                                    Nuestra misión es conectar de manera sencilla y confiable a reclutadores y candidatos, optimizando el proceso de búsqueda y publicación de vacantes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visión */}
                <div className="col-12 col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body d-flex">
                            <div className="me-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8z" />
                                    <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="card-title">Visión</h5>
                                <p className="card-text mb-0">
                                    Ser la plataforma de referencia para la gestión de oportunidades laborales, facilitando el encuentro entre talento y empleo de forma ágil y segura.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Propósito */}
                <div className="col-12 col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body d-flex">
                            <div className="me-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                                    <path d="M9.405 1.05a1 1 0 0 1 .79.434l.562.84c.06.09.164.118.25.07l.78-.42a1 1 0 0 1 1.278.366l.49.87c.044.078.125.125.21.125l1.02-.01a1 1 0 0 1 1 .99v1.04c0 .093.047.176.125.23l.786.496a1 1 0 0 1 .224 1.41l-.57.82c.055.18.03.38-.07.54l-.59.89c.01.03.01.062.01.094a1 1 0 0 1-.33.73l-.86.7c-.058.046-.08.12-.058.19l.21.76c.03.117.017.24-.038.343l-.6 1.02a1 1 0 0 1-.888.5h-1.08a1 1 0 0 1-.65-.25l-.66-.6c-.07-.064-.168-.094-.263-.08l-.82.12c-.12.018-.243-.01-.334-.078L9.2 13.7a1 1 0 0 1-.93 0l-.58-.33c-.09-.052-.199-.067-.301-.04l-.72.3a1 1 0 0 1-1.19-.33l-.44-.67a1 1 0 0 1-.06-.93l.02-.05-.64-.25a1 1 0 0 1-.53-1.32l.24-.76a1 1 0 0 1-.25-.9l-.02-.05-.57-.58a1 1 0 0 1-.11-1.02L1.6 6.9a1 1 0 0 1 .38-1.32l.5-.34c.097-.068.16-.18.16-.3V3.5a1 1 0 0 1 .99-1h1.04a1 1 0 0 1 .63.23l.7.6c.06.05.138.07.213.06l.76-.09c.07-.01.146.006.206.05l.83.45a1 1 0 0 1 .298.28z" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="card-title">Propósito</h5>
                                <p className="card-text mb-0">
                                    Brindar una herramienta intuitiva que permita a empresas y candidatos interactuar directamente,
                                    promoviendo oportunidades laborales accesibles para todos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
