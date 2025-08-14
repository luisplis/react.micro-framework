// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/demos`
  | `/demos/busca-frutas`
  | `/demos/cuestionario`
  | `/demos/cuestionario/ApiCountries`
  | `/demos/cuestionario/Congratulations`
  | `/demos/cuestionario/Question`
  | `/demos/cuestionario/Quiz`
  | `/demos/juego-3-en-raya`
  | `/page`
  | `/page-react`

export type Params = {
  
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
