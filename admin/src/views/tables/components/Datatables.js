import React from "react";
import axios from 'axios';
import {
  Stats,
  BigBreadcrumbs,
  WidgetGrid,
  JarvisWidget
} from "../../../common";

import Datatable from "../../../common/tables/components/Datatable";
import {webUrl} from "../../../config";

const url = webUrl +  '/v1/api/admin/vendors/';

export default class Datatables extends React.Component {

  constructor(props) {
    super(props) ;
    this.state = {

    }
  }


  render() {
    return (
      <div id="content">
        <div className="row">
          <BigBreadcrumbs
            items={["Members", "List of Members"]}
            icon="fa fa-fw fa-table"
            className="col-xs-12 col-sm-7 col-md-7 col-lg-4"
          />
          <Stats />
        </div>

        <WidgetGrid>
          <div className="row">
            <article className="col-sm-12">
              <JarvisWidget id="wid-id-0" editbutton={false} color="darken">
                <header>
                  <span className="widget-icon">
                    <i className="fa fa-table" />
                  </span>
                  <h2>User Table</h2>
                </header>
                <div>
                  <div className="widget-body no-padding">
                    <Datatable
                      options={{
                        ajax: "assets/api/tables/datatables.standard.json",
                        columns: [
                          { data: "id" },
                          { data: "name" },
                          { data: "email" },
                          { data: "password" },
                          { data: "ip_address" },
                          { data: "status" },
                          { data: "level" },
                          { data: "created_at" },
                        ]
                      }}
                      paginationLength={true}
                      className="table table-striped table-bordered table-hover"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th data-hide="phone">ID</th>
                          <th data-class="expand">
                            <i className="fa fa-fw fa-user text-muted hidden-md hidden-sm hidden-xs" />
                            Name
                          </th>
                          <th data-hide="phone">
                            <i className="fa fa-fw fa-phone text-muted hidden-md hidden-sm hidden-xs" />
                            Email
                          </th>
                          <th>Password</th>
                          <th data-hide="phone,tablet">
                            <i className="fa fa-fw fa-map-marker txt-color-blue hidden-md hidden-sm hidden-xs" />
                            Ip Address
                          </th>
                          <th data-hide="phone,tablet">
                            <i className="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs" />
                            Status
                          </th>
                          <th data-hide="phone,tablet">
                              <i className="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs" />
                              Level
                          </th>
                          <th data-hide="phone,tablet">
                              <i className="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs" />
                              Created At
                          </th>
                        </tr>
                      </thead>
                    </Datatable>
                  </div>
                </div>
              </JarvisWidget>

            </article>
          </div>
        </WidgetGrid>
      </div>
    );
  }
}
