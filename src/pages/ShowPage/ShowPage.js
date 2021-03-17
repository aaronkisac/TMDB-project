import to from "await-to-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import searchService from "services/searchService";
import Show from "components/Show";

export default function ShowPage() {
  const { id, show } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [castsList, setCastsList] = useState([]);
  const [showDetails, setShowDetails] = useState({});

  const fetchShowCasts = async () => {
    const [err, payload] = await to(searchService.getShowCasts(show, id));
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
    setCastsList(payload);
  };

  const fetchShowDetails = async () => {
    const [err, payload] = await to(searchService.getShowDetails(show, id));
    if (err) {
      enqueueSnackbar(`Show details API : ${err.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return;
    }
    setShowDetails(payload);
  };

  useEffect(() => {
    fetchShowDetails(show, id);
    fetchShowCasts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return <Show {...showDetails} castsList={castsList} />;
}
