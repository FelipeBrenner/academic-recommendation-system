import brLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
	type EventResizeDoneArg,
} from "@fullcalendar/interaction";
import FullCalendar, {
	type DateSelectArg,
	type EventClickArg,
	type EventDropArg,
} from "@fullcalendar/react";
import { useEffect, useRef, useState } from "react";

import { RecommendationTooltip } from "@components";
import { COLORS, localStorageKeys } from "@constants";
import { useAuth } from "@contexts";
import { eventsDatabase, updateEvent } from "@database";
import type {
	ICalendarEvent,
	IEventColor,
	IRecommendations,
} from "@interfaces";
import { Container } from "@mui/material";
import { toast } from "react-toastify";
import { useReadLocalStorage } from "usehooks-ts";
import * as Styles from "./Calendar.styles";
import { EventDialog } from "./EventDialog/EventDialog";
import { Toolbar } from "./Toolbar/Toolbar";

export const Calendar = () => {
	const calendarRef = useRef<FullCalendar | null>(null);
	const [date, setDate] = useState<Date>(new Date());
	const [dialog, setDialog] = useState<any>({
		isOpen: false,
		eventId: undefined,
		range: undefined,
	});
	const { user } = useAuth();
	const [events, setEvents] = useState<ICalendarEvent[]>([]);
	const [filteredEvents, setFilteredEvents] =
		useState<ICalendarEvent[]>(events);
	const [eventColors, setEventColors] = useState<IEventColor[]>([]);
	const recommendations = useReadLocalStorage<IRecommendations>(
		localStorageKeys.recommendations,
	);

	const eventColorsConst: IEventColor[] = eventColors;
	const colors = [...COLORS];

	const getLabelColor = (userId: string) => {
		const found = eventColorsConst.find((color) => color.userId === userId);

		if (found) {
			return found.color;
		}

		const color = colors[0];

		eventColorsConst.push({
			userId,
			color,
		});

		setEventColors(eventColorsConst);

		colors.splice(0, 1);

		return color;
	};

	const handleCloseDialog = (): void => {
		setDialog({
			isOpen: false,
		});
	};

	useEffect(() => {
		const proccessEvents = async () => {
			const events = await eventsDatabase.getEvents(user?.id ?? "");

			const eventsFormatted = events.map((event: any) => ({
				...event,
				color: getLabelColor(event.userId),
			}));

			setEvents(eventsFormatted);
		};

		proccessEvents();
	}, [dialog.isOpen, user]);

	useEffect(() => {
		setFilteredEvents(events);
	}, [events]);

	const handleDateToday = (): void => {
		const calendarEl = calendarRef.current;

		if (calendarEl) {
			const calendarElApi = calendarEl.getApi();

			calendarElApi.today();
			setDate(calendarElApi.getDate());
		}
	};

	const handleDatePrev = (): void => {
		const calendarEl = calendarRef.current;

		if (calendarEl) {
			const calendarElApi = calendarEl.getApi();

			calendarElApi.prev();
			setDate(calendarElApi.getDate());
		}
	};

	const handleDateNext = (): void => {
		const calendarEl = calendarRef.current;

		if (calendarEl) {
			const calendarElApi = calendarEl.getApi();

			calendarElApi.next();
			setDate(calendarElApi.getDate());
		}
	};

	const handleAddClick = (): void => {
		setDialog({
			isOpen: true,
		});
	};

	const handleRangeSelect = (arg: DateSelectArg): void => {
		const calendarEl = calendarRef.current;

		if (calendarEl) {
			const calendarElApi = calendarEl.getApi();

			calendarElApi.unselect();
		}

		const start = new Date(arg.start);
		start.setHours(new Date().getHours() + 1);
		const end = new Date(arg.end);
		end.setDate(end.getDate() - 1);
		end.setHours(new Date().getHours() + 2);

		setDialog({
			isOpen: true,
			range: {
				start,
				end,
			},
		});
	};

	const handleEventSelect = (arg: EventClickArg): void => {
		setDialog({
			isOpen: true,
			eventId: arg.event.id,
		});
	};

	const handleEventDrop = async (
		arg: EventResizeDoneArg | EventDropArg,
	): Promise<void> => {
		const { event } = arg;

		try {
			await updateEvent(event.id, {
				start: event.start?.getTime(),
				end: event.end?.getTime(),
			});
			toast.success("Atividade atualizada!");
		} catch (err) {
			console.error(err);
		}
	};

	const selectedEvent =
		dialog.eventId && events.find((event: any) => event.id === dialog.eventId);

	return (
		<Container maxWidth="xl">
			<Styles.Card>
				<RecommendationTooltip
					recommendation={recommendations?.estabelecimento_de_metas}
				/>
				<Toolbar
					date={date}
					onAddClick={handleAddClick}
					onDateNext={handleDateNext}
					onDatePrev={handleDatePrev}
					onDateToday={handleDateToday}
				/>
				<Styles.FullCalendarWrapper>
					<FullCalendar
						dayMaxEventRows={3}
						droppable
						editable
						eventClick={handleEventSelect}
						eventDisplay="block"
						eventDrop={handleEventDrop}
						events={filteredEvents}
						headerToolbar={false}
						height={700}
						initialDate={date}
						initialView="dayGridMonth"
						plugins={[dayGridPlugin, interactionPlugin]}
						ref={calendarRef}
						rerenderDelay={10}
						select={handleRangeSelect}
						selectable
						weekends
						locale={brLocale}
					/>
				</Styles.FullCalendarWrapper>
			</Styles.Card>
			<EventDialog
				event={selectedEvent}
				onAddComplete={handleCloseDialog}
				onClose={handleCloseDialog}
				onDeleteComplete={handleCloseDialog}
				onEditComplete={handleCloseDialog}
				open={dialog.isOpen}
				range={dialog.range}
			/>
		</Container>
	);
};
