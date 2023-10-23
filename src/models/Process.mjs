import { Schema, model } from 'mongoose';
import { TYPE_OF_FILTERS } from '../commons/constans.mjs';

const ProcessSchema = new Schema(
  {
    filters: {
      type: [
        {
          type: String,
          enum: TYPE_OF_FILTERS,
          required: true,
        },
      ],
    },
    images: [
      {
        type: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const ProcessModel = model('Process', ProcessSchema);

export default ProcessModel;
