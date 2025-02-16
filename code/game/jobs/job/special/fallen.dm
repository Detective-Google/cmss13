/datum/job/fallen
	title = JOB_SQUAD_MARINE
	gear_preset = /datum/equipment_preset/uscm/pfc

/obj/effect/landmark/start/afterlife
	job = /datum/job/fallen

//Deletes the mob if the user dies or ghosts.
/datum/job/fallen/proc/after_spawn(mob/living/fallen_mob)
	RegisterSignal(fallen_mob, COMSIG_MOB_DEATH, PROC_REF(delete_mob))
	RegisterSignal(fallen_mob, COMSIG_MOB_LOGOUT, PROC_REF(delete_mob))
	to_chat(fallen_mob, SPAN_DANGER("This is a place for everyone to experiment and RP. Standard rules applies here. Do not blow the vendors, do not grief,\
	do not try to lag the server with explosions."))

/datum/job/fallen/proc/delete_mob(mob/living/source)
	SIGNAL_HANDLER

	UnregisterSignal(source, COMSIG_MOB_DEATH)
	UnregisterSignal(source, COMSIG_MOB_LOGOUT)
	qdel(source)

/datum/job/fallen/engineer
	title = JOB_SQUAD_ENGI
	gear_preset = /datum/equipment_preset/uscm/engineer
	entry_message_body = "You've entered the afterlife as a Combat Technician."

/datum/job/fallen/leader
	title = JOB_SQUAD_LEADER
	gear_preset = /datum/equipment_preset/uscm/leader
	entry_message_body = "You've entered the afterlife as a Squad Leader."

/datum/job/fallen/medic
	title = JOB_SQUAD_MEDIC
	gear_preset = /datum/equipment_preset/uscm/medic
	entry_message_body = "You've entered the afterlife as a Hospital Corpsman."

/datum/job/fallen/specialist
	title = JOB_SQUAD_SPECIALIST
	gear_preset = /datum/equipment_preset/uscm/spec
	entry_message_body = "You've entered the afterlife as a Specialist."

/datum/job/fallen/tl
	title = JOB_SQUAD_TEAM_LEADER
	gear_preset = /datum/equipment_preset/uscm/tl
	entry_message_body = "You've entered the afterlife as a Fireteam Leader."

