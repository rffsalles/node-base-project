import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
    provider: string;
    date: Date;
}
class CreateAppointmentService {
    public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );
        const AppointmentDate = startOfHour(date);

        if (await appointmentsRepository.findByDate(AppointmentDate)) {
            throw Error('this appointment is already booked!');
        }
        const appointment = appointmentsRepository.create({
            provider,
            date: AppointmentDate,
        });
        await appointmentsRepository.save(appointment);
        return appointment;
    }
}
export default CreateAppointmentService;
