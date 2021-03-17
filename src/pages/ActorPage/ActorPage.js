import to from "await-to-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import searchService from "services/searchService";
import Actor from "components/Actor";

export default function ActorPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [creditsList, setCreditsList] = useState([]);
  const [actorDetails, setActorDetails] = useState({});

  const fetchActorCredits = async () => {
    const [err, payload] = await to(searchService.getActorCredits(id));
    if (err) {
      enqueueSnackbar(`Casts list API :${err.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return;
    }
    setCreditsList(payload);
  };

  const fetchActorDetails = async () => {
    const [err, payload] = await to(searchService.getActorDetails(id));
    if (err) {
      enqueueSnackbar(`Actor details API : ${err.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return;
    }
    setActorDetails(payload);
  };

  useEffect(() => {
    fetchActorDetails(id);
    fetchActorCredits(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return <Actor {...actorDetails} creditsList={creditsList} />;
}
