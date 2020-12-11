/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
import React, { Suspense, useState, useEffect } from "react";
import { Row, Collapse, Card, Button } from "reactstrap";
import Breadcrumb from "../../../component/navs/Breadcrumb";
import { Separator, Colxx } from "../../../component/common/CustomBootstrap";
import faqData from "../../../data/faq";
import { FaqService } from "../../../services/FaqService";
import CircularProgress from "@material-ui/core/CircularProgress";

const Faq = ({ match, ...props }) => {
  const [showingIndex, setShowIndex] = useState(0);
  const [faqData, setFaqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    var data = await FaqService({});
    setFaqData(data);
    setIsLoading(false);
  }, [match, props]);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="FAQ" match={match} />
          <Separator className="mb-5" />
        </Colxx>

        <Colxx xxs="12" className="mb-4 ">
          {!isLoading &&
            (faqData.length > 0 ? (
              <>
                {faqData.map((item, index) => {
                  return (
                    <Card className="d-flex mb-3" key={`faqItem_${index}`}>
                      <div className="d-flex flex-grow-1 min-width-zero">
                        <Button
                          color="link"
                          className="card-body  btn-empty btn-link list-item-heading text-left text-one"
                          onClick={() => setShowIndex(index)}
                          aria-expanded={showingIndex === index}
                        >
                          {item.question}
                        </Button>
                      </div>
                      <Collapse isOpen={showingIndex === index}>
                        <div
                          className="card-body accordion-content pt-0"
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        />
                      </Collapse>
                    </Card>
                  );
                })}
              </>
            ) : (
              <>
                <div className="mt-5" align="center">
                  <img
                    src="/assets/img/utilities/empty-support.png"
                    style={{ width: "30%", height: "30%" }}
                  />
                  <h2>No Faq to show</h2>
                </div>
              </>
            ))}
          {isLoading && (
            <div className="mt-5" align="center">
              <CircularProgress color="primary" />
              <p>Loading Faq....please wait</p>
            </div>
          )}
        </Colxx>
      </Row>
    </>
  );
};

export default Faq;
