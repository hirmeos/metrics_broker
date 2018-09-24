import { fakeToken } from './fakeToken';

const getFakeWorkTypes = (req, res) => {
  if (req.headers.authorization !== `Bearer ${fakeToken()}`) {
    res.json({
      "status": "error",
      "code": 403,
      "count": 1,
      "data": [],
      description: "",
      message: "You do not have permissions to access this resource."
    });
    return;
  }
  res.json(
    {
      "status": "ok",
      "count": 26,
      "code": 200,
      "data": [
        {
          "work_type": "book-section"
        },
        {
          "work_type": "book-track"
        },
        {
          "work_type": "book-part"
        },
        {
          "work_type": "book"
        },
        {
          "work_type": "book-set"
        },
        {
          "work_type": "book-chapter"
        },
        {
          "work_type": "book-series"
        },
        {
          "work_type": "component"
        },
        {
          "work_type": "dissertation"
        },
        {
          "work_type": "dataset"
        },
        {
          "work_type": "edited-book"
        },
        {
          "work_type": "journal-article"
        },
        {
          "work_type": "journal-volume"
        },
        {
          "work_type": "journal"
        },
        {
          "work_type": "journal-issue"
        },
        {
          "work_type": "monograph"
        },
        {
          "work_type": "other"
        },
        {
          "work_type": "proceedings-article"
        },
        {
          "work_type": "proceedings"
        },
        {
          "work_type": "posted-content"
        },
        {
          "work_type": "report"
        },
        {
          "work_type": "reference-entry"
        },
        {
          "work_type": "report-series"
        },
        {
          "work_type": "reference-book"
        },
        {
          "work_type": "standard"
        },
        {
          "work_type": "standard-series"
        }
      ]
    }
  );
};

export default {
  'GET /work_types': getFakeWorkTypes,
};
