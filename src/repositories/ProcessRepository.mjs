import ProcessModel from '../models/Process.mjs';

class ProcessRepository {
  // eslint-disable-next-line class-methods-use-this
  async save(filters, images) {
    const newProcess = new ProcessModel({
      filters,
      images,
    });

    const savedProcess = await newProcess.save();
    return savedProcess;
  }
}

export default ProcessRepository;

/* Codigo antiguo
class ProcessRepository {
  // eslint-disable-next-line class-methods-use-this
  async save(process) {
    const newProcess = new ProcesModel();
    newProcess.filters = process.filters;
    await newProcess.save();
    return newProcess;
  }
}
*/
