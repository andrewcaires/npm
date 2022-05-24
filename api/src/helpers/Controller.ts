import { noop } from "@andrewcaires/utils.js";
import { Request, Response } from "express";
import { Attributes, FindOptions, Model, ModelStatic, Op } from "sequelize";

import { Log } from "../helpers/Log";
import { Responses } from "../helpers/Responses";

type FnRecord<M> = (records: M) => any;
type FnRecords<M> = (records: Array<M>) => Array<any>;

export class Controller<M extends Model<M>> {

  private log: string;
  private model: ModelStatic<M>;

  constructor(log: string, model: ModelStatic<M>) {

    this.log = log;
    this.model = model;
  }

  public add() {

    return async (req: Request, res: Response) => {

      const record = await this.model.create(req.body).catch((error) => {

        Log.error(error.message, this.log + ".add");
      });

      if (record) {

        return Responses.data(res, { id: (record as any).id });
      }

      return Responses.error(res, "Internal Server Error");
    };
  }

  public all(options?: FindOptions<Attributes<M>>, fn?: FnRecords<M>) {

    return async (req: Request, res: Response) => {

      if (!options) {

        options = {};
      }

      const temp = { ...options };

      temp.where = temp.where ? { ...temp.where } : {};

      const limit = req.query.limit?.toString();

      if (limit) {

        temp.limit = parseInt(limit);
      }

      const offset = req.query.offset?.toString();

      if (offset) {

        temp.offset = parseInt(offset);
      }

      const asc = req.query.asc?.toString();

      if (asc) {

        temp.order = [[asc, "ASC"]];
      }

      const desc = req.query.desc?.toString();

      if (desc) {

        temp.order = [[desc, "DESC"]];
      }

      const likes: Array<any> = [];

      const search = req.query.search?.toString();

      if (search) {

        Object.keys(this.model.getAttributes()).forEach((value) => {

          likes.push({ [value]: { [Op.like]: `%${search}%` } });
        });

        if (likes.length) {

          temp.where = { ...temp.where, ...{ [Op.or]: [...likes] } };
        }
      }

      const records = await this.model.findAll(temp).catch((error) => {

        Log.error(error.message, this.log + ".all");
      });

      const count = await this.model.count(temp).catch(noop);

      if (records) {

        return Responses.data(res, { count, records: fn ? fn(records) : records });
      }

      return Responses.error(res, "Internal Server Error");
    };
  }

  public del() {

    return async (req: Request, res: Response) => {

      const { id } = req.params;

      const rows = await this.model.destroy({

        where: { id } as any,

      }).catch((error) => {

        Log.error(error.message, this.log + ".del");
      });

      if (rows) {

        return Responses.success(res, "OK");
      }

      return Responses.notfound(res, "Record not found");
    };
  }

  public get(options?: FindOptions<Attributes<M>>, fn?: FnRecord<M>) {

    return async (req: Request, res: Response) => {

      if (!options) {

        options = {};
      }

      const temp = { ...options };

      temp.where = temp.where ? { ...temp.where } : {};

      const { id } = req.params;

      const record = await this.model.findByPk(id, temp).catch((error) => {

        Log.error(error.message, this.log + ".get");
      });

      if (record) {

        return Responses.data(res, fn ? fn(record) : record.toJSON());
      }

      if (record === null) {

        return Responses.notfound(res, "Record not found");
      }

      return Responses.error(res, "Internal Server Error");
    };
  }

  public set() {

    return async (req: Request, res: Response) => {

      const { id } = req.params;

      const update = await this.model.update(req.body, {

        where: { id } as any,

      }).catch((error) => {

        Log.error(error.message, this.log + ".set");
      });

      if (update) {

        const [count] = update;

        if (count) {

          return Responses.success(res, "OK");
        }
      }

      return Responses.success(res, "Record not changed");
    };
  }
}
