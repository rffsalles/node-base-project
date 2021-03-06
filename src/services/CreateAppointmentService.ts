/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
    provider_id: string;
    date: Date;
}
class CreateAppointmentService {
    public async execute({
        provider_id,
        date,
    }: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );
        const AppointmentDate = startOfHour(date);

        if (await appointmentsRepository.findByDate(AppointmentDate)) {
            throw new AppError('this appointment is already booked!', 400);
        }
        const appointment = appointmentsRepository.create({
            provider_id,
            date: AppointmentDate,
        });
        await appointmentsRepository.save(appointment);
        return appointment;
    }
}
export default CreateAppointmentService;
