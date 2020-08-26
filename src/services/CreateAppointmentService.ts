import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
    providerId: string;
    date: Date;
}
class CreateAppointmentService {
    public async execute({
        providerId,
        date,
    }: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );
        const AppointmentDate = startOfHour(date);

        if (await appointmentsRepository.findByDate(AppointmentDate)) {
            throw Error('this appointment is already booked!');
        }
        const appointment = appointmentsRepository.create({
            providerId,
            date: AppointmentDate,
        });
        await appointmentsRepository.save(appointment);
        return appointment;
    }
}
export default CreateAppointmentService;
